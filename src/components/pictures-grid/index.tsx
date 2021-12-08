import React, { useState } from "react";
import {
    arrayMove,
    SortableContainer,
    SortableElement,
} from "react-sortable-hoc";
import { Modal, Upload } from "antd";
import UploadList from "antd/es/upload/UploadList";

import type { CSSProperties } from "react";

const { Dragger } = Upload;

// https://github.com/dreamqyq/antd-upload-dnd/blob/master/src/component/PicturesGrid/index.tsx#L65

const itemStyle = {
    width: 104,
    height: 104,
    margin: 4,
    cursor: "grab",
};

const SortableItem = SortableElement((params: any) => (
    <div style={itemStyle}>
        <UploadList
            locale={{ previewFile: "预览图片", removeFile: "删除图片" }}
            showDownloadIcon={false}
            listType={params.props.listType}
            onPreview={params.onPreview}
            onRemove={params.onRemove}
            items={[params.item]}
        />
    </div>
));

const listStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    // maxWidth: 400,
    // minWidth: 400,
};
const SortableList = SortableContainer((params: any) => {
    return (
        <>
            <div style={listStyle}>
                {params.items.map((item: any, index: any) => (
                    <SortableItem
                        key={`${item.uid}`}
                        index={index}
                        item={item}
                        props={params.props}
                        onPreview={params.onPreview}
                        onRemove={params.onRemove}
                    />
                ))}
            </div>
            <Upload
                {...params.props}
                accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                showUploadList={false}
                onChange={params.onChange}
            >
                {params.props.children}
            </Upload>
        </>
    );
});

const getBase64 = (file: Blob) => {
    if (!file) return Promise.reject(new Error("no file"));
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const imagePreview = async (file: any, callback: any) => {
    const newFile = file;
    if (!newFile.url && !newFile.preview) {
        newFile.preview = await getBase64(file.originFileObj);
    }
    const newPreviewImage = newFile.url || newFile.preview || "";
    callback({
        image: newPreviewImage,
    });
};

const PicturesGrid = ({ onChange: onFileChange, ...props }: any) => {
    const [previewImage, setPreviewImage] = useState("");
    const fileList = props.fileList || [];
    const onSortEnd = ({ oldIndex, newIndex }: any) => {
        onFileChange({ fileList: arrayMove(fileList, oldIndex, newIndex) });
    };

    const onChange = ({ fileList: newFileList }: any) => {
        onFileChange({ fileList: newFileList });
    };

    const onRemove = (file: any) => {
        const newFileList = fileList.filter(
            (item: any) => item.uid !== file.uid
        );
        onFileChange({ fileList: newFileList });
    };

    const onPreview = async (file: any) => {
        await imagePreview(file, ({ image }: any) => {
            setPreviewImage(image);
        });
    };
    return (
        <>
            <SortableList
                // 当移动 1 之后再触发排序事件，默认是0，会导致无法触发图片的预览和删除事件
                distance={1}
                items={fileList}
                onSortEnd={onSortEnd}
                axis="xy"
                helperClass="SortableHelper"
                props={props}
                onChange={onChange}
                onRemove={onRemove}
                onPreview={onPreview}
            />
            <Modal
                visible={!!previewImage}
                footer={null}
                onCancel={() => setPreviewImage("")}
                bodyStyle={{ padding: 0 }}
            >
                <img style={{ width: "100%" }} alt="" src={previewImage} />
            </Modal>
        </>
    );
};
export default PicturesGrid;
