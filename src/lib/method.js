import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import sortBy from 'sort-by';
import { CREATE } from 'react-admin';

const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.rawFile);

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

const addUploadFeature = requestHandler => (type, resource, params) => {
    if (type === 'UPDATE') {
        if (params.data.image && params.data.image.length) {
            const formerPictures = params.data.image.filter(p => !(p.rawFile instanceof File));
            const newPictures = params.data.image.filter(p => p.rawFile instanceof File);

            return Promise.all(newPictures.map(convertFileToBase64))
                .then(base64Pictures =>
                    base64Pictures.map(picture64 => ({
                        src: picture64,
                        title: `${params.data.title}`
                    }))
                )
                .then(transformedNewPictures =>
                    requestHandler(type, resource, {
                        ...params,
                        data: {
                            ...params.data,
                            image: [...transformedNewPictures, ...formerPictures]
                        }
                    })
                );
        }
    }
    // for other request types and reources, fall back to the defautl request handler
    return requestHandler(type, resource, params);
};

const getImageSize = file => {
    return new Promise(resolve => {
        const img = document.createElement('img');
        img.onload = function () {
            resolve({
                width: this.width,
                height: this.height
            });
        };
        img.src = file.src;
    });
};

const upload = async (fieldName, submitedData, id, resourceName, resourcePath) => {
    let file = submitedData[fieldName];
    file = Array.isArray(file) ? file[0] : file;
    const rawFile = file.rawFile;

    const result = {};
    if (file && rawFile && rawFile.name) {
        const ref = firebase
            .storage()
            .ref()
            .child(`${resourcePath}/${id}/${fieldName}`);
        const snapshot = await ref.put(rawFile);
        const downloadURL = await snapshot.ref.getDownloadURL();
        result[fieldName] = [{}];
        result[fieldName][0].uploadedAt = new Date();
        result[fieldName][0].src = downloadURL;
        result[fieldName][0].type = rawFile.type;
        if (rawFile.type.indexOf('image/') === 0) {
            try {
                const imageSize = await getImageSize(file);
                result[fieldName][0].width = imageSize.width;
                result[fieldName][0].height = imageSize.height;
            } catch (e) {
                console.error(`Failed to get image dimensions`);
            }
        }
        return result;
    }
    return false;
};

const save = async (
    id,
    data,
    previous,
    resourceName,
    resourcePath,
    firebaseSaveFilter,
    uploadResults,
    isNew,
    timestampFieldNames
) => {
    if (uploadResults) {
        uploadResults.map(uploadResult => (uploadResult ? Object.assign(data, uploadResult) : false));
    }

    if (isNew) {
        Object.assign(data, { [timestampFieldNames.createdAt]: new Date() });
    }

    data = Object.assign(previous, { [timestampFieldNames.updatedAt]: new Date() }, data);

    if (!data.id) {
        data.id = id;
    }
    console.log('save');
    await firebase
        .firestore()
        .doc(`${resourcePath}/${data.id}`)
        .set(firebaseSaveFilter(data));
    return { data };
};

const saveUser = async (
    id,
    data,
    previous,
    resourceName,
    resourcePath,
    firebaseSaveFilter,
    uploadResults,
    isNew,
    timestampFieldNames
) => {
    if (uploadResults) {
        uploadResults.map(uploadResult => (uploadResult ? Object.assign(data, uploadResult) : false));
    }

    if (isNew) {
        Object.assign(data, { [timestampFieldNames.createdAt]: new Date(), email: data.noHp + "@mizu.com", type: "mitra", jmlOrder: 0, ratingMitra: 5 });
    }

    data = Object.assign(previous, { [timestampFieldNames.updatedAt]: new Date() }, data);
    console.log(data.id);
    if (data.id === id) {
        await firebase
            .firestore()
            .doc(`${resourcePath}/${data.id}`)
            .update(firebaseSaveFilter(data));
    } else {
        await firebase
            .firestore()
            .doc(`${resourcePath}/${data.id}`)
            .delete();

        data.id = id;

        await firebase.auth().createUserWithEmailAndPassword(data.id, data.password)
            .then(function (currentUser) {
                console.log("uid :" + currentUser.user.uid);

                Object.assign(data, { [timestampFieldNames.createdAt]: new Date(), email: data.noHp + "@mizu.com", type: "mitra", jmlOrder: 0, ratingMitra: 5, uid: currentUser.user.uid });

                firebase
                    .firestore()
                    .doc(`${resourcePath}/${data.id}`)
                    .set(firebaseSaveFilter(data));
            }).catch(function (error) {
                //Handle error
            });
    }



    console.log(data.id);

    return { data };

};

const del = async (id, resourceName, resourcePath, uploadFields) => {
    if (uploadFields.length) {
        uploadFields.map(fieldName =>
            firebase
                .storage()
                .ref()
                .child(`${resourcePath}/${id}/${fieldName}`)
                .delete()
        );
    }

    await firebase
        .firestore()
        .doc(`${resourcePath}/${id}`)
        .delete();
    return { data: id };
};

const delMany = async (ids, resourceName, previousData) => {
    await ids.map(id =>
        firebase
            .firestore()
            .doc(`${resourceName}/${id}`)
            .delete()
    );
    return { data: ids };
};

const getItemID = (params, type, resourceName, resourcePath, resourceData) => {
    let itemId = params.data.id || params.id || params.data.key || params.key;
    if (!itemId) {
        itemId = firebase
            .firestore()
            .collection(resourcePath)
            .doc().id;
    }

    if (!itemId) {
        throw new Error('ID is required');
    }

    if (resourceData && resourceData[itemId] && type === CREATE) {
        throw new Error('ID already in use');
    }

    return itemId;
};

const getOne = async (params, resourceName, resourceData) => {
    if (params.id) {
        let result = await firebase
            .firestore()
            .collection(resourceName)
            .doc(params.id)
            .get();

        if (result.exists) {
            const data = result.data();

            if (data && data.id == null) {
                data['id'] = result.id;
            }
            // console.log(result);
            return { data: recusivelyCheckObjectValue(data) };
        } else {
            throw new Error('Id not found');
        }
    } else {
        throw new Error('Id not found');
    }
};

/**
 * params example:
 * pagination: { page: 1, perPage: 5 },
 * sort: { field: 'title', order: 'ASC' },
 * filter: { author_id: 12 }
 */


function recusivelyCheckObjectValue(data) {
    const isFalsey = !data;
    if (isFalsey) {
        return data;
    }
    const isPrimitive = typeof data !== 'object';
    if (isPrimitive) {
        return data;
    }
    const isTimestamp = !!data.toDate && typeof data.toDate === 'function';
    if (isTimestamp) {
        return data.toDate();
    }
    const isArray = Array.isArray(data);
    if (isArray) {
        return data.map(value => recusivelyCheckObjectValue(value));
    }
    const isObject = typeof data === 'object';
    if (isObject) {
        Object.keys(data).map(key => {
            const value = data[key];
            return data[key] = recusivelyCheckObjectValue(value);

        });
        return data;
    }
}

const getList = async (params, resourceName, resourceData) => {
    if (params.pagination) {
        let values = [];
        let snapshots = await firebase
            .firestore()
            .collection(resourceName)
            .get();

        for (const snapshot of snapshots.docs) {
            const data = snapshot.data();
            if (data && data.id == null) {
                data['id'] = snapshot.id;
            }
            values.push(data);
        }

        if (params.filter) {
            values = values.filter(item => {
                let meetsFilters = true;
                for (const key of Object.keys(params.filter)) {
                    meetsFilters = item[key] === params.filter[key];
                }
                return meetsFilters;
            });
        }

        if (params.sort) {
            values.sort(sortBy(`${params.sort.order === 'ASC' ? '' : '-'}${params.sort.field}`));
        }

        const keys = values.map(i => i.id);
        const { page, perPage } = params.pagination;
        const _start = (page - 1) * perPage;
        const _end = page * perPage;
        console.log('getList');
        console.log(values);
        // const data = values ? values.slice(_start, _end) : [];
        const data = recusivelyCheckObjectValue(values) ? values.slice(_start, _end) : [];
        const ids = keys.slice(_start, _end) || [];
        const total = values ? values.length : 0;
        console.log('getListPagination');
        console.log(data);
        return { data, ids, total };
    } else {
        throw new Error('Error processing request');
    }
};

const getMany = async (params, resourceName, resourceData) => {
    let data = [];
    /* eslint-disable no-await-in-loop */
    for (const id of params.ids) {
        let { data: item } = await getOne({ id }, resourceName, resourceData);
        data.push(item);
    }
    return { data };
};

const getManyReference = async (params, resourceName, resourceData) => {
    if (params.target) {
        if (!params.filter) params.filter = {};
        params.filter[params.target] = params.id;
        let { data, total } = await getList(params, resourceName, resourceData);
        return { data, total };
    } else {
        throw new Error('Error processing request');
    }
};

export default {
    upload,
    save,
    saveUser,
    del,
    delMany,
    getItemID,
    getOne,
    getList,
    getMany,
    getManyReference,
    addUploadFeature,
    convertFileToBase64,
};
