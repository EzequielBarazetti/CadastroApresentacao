import React, { useEffect, useRef, useState } from 'react';
import { Button, Row, Col, Form, Input, Select, message } from 'antd';
import { Sexo } from '../../types/enum';
import { insertUpdateCadClient,   listClients } from '../../actions/action';
import Table, { ColumnsType } from 'antd/lib/table';
import { EditOutlined } from '@ant-design/icons';
import ModalCustom, { RefModalCustom } from '../../generics/modalCustom';
import 'antd/dist/antd.css';

interface formCadClient {
    id    : number;
    nome  : string;
    sexo  : string;
    cpf   : string;
    endereco : string;
    cidade : string;
}

const FormCadClient: React.FC = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [form] = Form.useForm<formCadClient>();
    const [listData, setListData] = useState<{ data: formCadClient[]; total: number }>({
        data: [],
        total: 0,
    });

    const [idReg, setIdReg] = useState<number>(0);
    const refModalCustom = useRef<RefModalCustom>(null);

    const onFieldsChange = () => {
        setIsButtonDisabled(false);
    };
    useEffect(() => {
        getDataClient()
     }, []);
 
     const onFormSubmit = async (values: formCadClient) => {
         try {
           
             await insertUpdateCadClient(idReg, values);
             
             message.success('Cadastro registrado com sucesso!', 2.5)
             getDataClient()  
             refModalCustom.current?.closeModal()
         } catch (err) {
             console.log(err);
         }
     };
 
    
    const getDataClient = async (page = 1, pageSize = 100) => {
        try {
            const data = await listClients(page, pageSize);
            setListData({ data: data.data, total: data.quant_total_records });
        } catch (err) {
            throw err;
        }
    };

    const columns: ColumnsType<any> = [
        {
            title: 'Código',
            dataIndex: 'id',
            align: 'center',
        },
        {
            title: 'Nome',
            dataIndex: 'nome', 
        },
        {
            title: 'Sexo',
            dataIndex: 'sexo',   
            render: (text) => {
                switch (text) {
                    case Sexo.Masculino: {
                        return 'Masculino';
                    }
                    case Sexo.Feminino: {
                        return 'Feminino';
                    }
                  
                }
            },
        },
    
        {
            title: 'Cpf',
            dataIndex: 'cpf',   
        },
        {
            title: 'Endereco',
            dataIndex: 'endereco',   
        },
        {
            title: 'Cidade',
            dataIndex: 'cidade',   
        },
        {
            title: '',
            dataIndex: '',
            align: 'center',
            // eslint-disable-next-line react/display-name
            render: (record) => (
                <Button
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                    onClick={() => {
                        const index = listData.data.map((value) => value.id).indexOf(record.id);
                        if (index > -1) {
                            setIdReg(record.id)
                           form.setFieldsValue(listData.data[index])
                        }
                        refModalCustom.current?.showModal();

                    }}
                />
            ),
        },
    ];


    return (
        <>
        <Button
                onClick={() => {
                    refModalCustom.current?.showModal()
                    setIdReg(0)
                    form.resetFields()
                   
                }}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Novo
            </Button>
        <ModalCustom title="Cadastro de Cliente" ref={refModalCustom} modalConfig={{ width: 900 }}>
            <Form
                layout="vertical"
                name="configForm"
                form={form}
                onFinish={onFormSubmit}
                onFieldsChange={onFieldsChange}
            >
                <Row gutter={12} justify="space-between" style={{ marginTop: 10 }}>
                    <Col span={6} md={{ span: 5 }} xl={{ span: 10 }} xxl={{ span: 10 }}>
                        <Form.Item name="sexo" label="Tipo" rules={[{ required: true }]}>
                            <Select >
                                <Select.Option value={Sexo.Masculino}>Masculino</Select.Option>
                                <Select.Option value={Sexo.Feminino}>Feminino</Select.Option>
                                
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12} md={{ span: 9 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                        <Form.Item
                            name="nome"
                            label="Nome"
                            rules={[{ required: true }]}
                        >
                            <Input
                                placeholder="Informe o nome"
                                type="string"
                                onChange={(e) =>
                                    form.setFieldsValue({
                                        nome: e.target?.value,
                                    })
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12} md={{ span: 9 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                        <Form.Item
                            name="cpf"
                            label="Cpf"
                            rules={[{ required: true }]}
                        >
                            <Input
                                placeholder="Informe o CPF"
                                type="string"
                                onChange={(e) =>
                                    form.setFieldsValue({
                                        cpf: e.target?.value,
                                    })
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12} md={{ span: 9 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                        <Form.Item
                            name="endereco"
                            label="Endereço"
                            rules={[{ required: true }]}
                        >
                            <Input
                                placeholder="Informe o Endereço"
                                type="string"
                                onChange={(e) =>
                                    form.setFieldsValue({ endereco: e.target?.value })
                                }
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12} md={{ span: 9 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                        <Form.Item
                            name="cidade"
                            label="Cidade"
                            rules={[{ required: true }]}
                        >
                            <Input
                                placeholder="Informe a Cidade"
                                type="string"
                                onChange={(e) =>
                                    form.setFieldsValue({ cidade: e.target?.value })
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                shape="round"
                                disabled={isButtonDisabled}
                                style={{ float: 'right' }}

                            >
                                Salvar
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            </ModalCustom>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={listData.data}
                size="small"
                pagination={{ hideOnSinglePage: true }}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setIdReg(record.id);
                        },
                    };
                }}
            />
        </>
    );
};

export default FormCadClient;

