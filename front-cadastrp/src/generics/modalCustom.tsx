import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal/Modal';
import React, { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react';


type PropsModalCustom = {
    children?: ReactNode;
    title: string;
    modalConfig?: ModalProps;
};

export type RefModalCustom = {
    showModal: () => void;
    closeModal: () => void;
};

const ModalCustom: React.ForwardRefRenderFunction<RefModalCustom | undefined, PropsModalCustom> = (
    { children, title, modalConfig = {} }: PropsModalCustom,
    ref,
) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showComponent, setShowComponent] = useState(false);

    useImperativeHandle(ref, () => ({
        showModal: () => setIsVisible(true),
        closeModal: () => setIsVisible(false),
    }));

    useEffect(() => {
        setShowComponent(isVisible);
    }, [isVisible]);

    return (
        <Modal
            visible={isVisible}
            title={title}
            className="drawer-form"
            width={'60%'}
            onCancel={() => setIsVisible(false)}
            footer={[]}
            destroyOnClose={true}
            {...modalConfig}
        >
            {showComponent ? children : ''}
        </Modal>
    );
};

export default forwardRef(ModalCustom);
