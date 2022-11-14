import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Select, Table, message } from 'antd'
const ItemPgae = () => {

  const dispatch = useDispatch()
  const [itemsData, setItemsData] = useState([])
  const [popUpModal, setPopUpModal] = useState(false)
  const [editItem, setEditItem] = useState(null)

  const getAllItems = async () => {
  try {
    dispatch({
      type:'SHOW_LOADING'
    })
    //  server + itemRoutes
    const { data } = await axios.get('/api/items/get-item');
    setItemsData(data)
    dispatch({
      type: 'HIDE_LOADING'
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

  // useEffect
    useEffect(() => {
      getAllItems()
      //eslint-disable-next-line
    },[])

    // handle Delete
    const handleDelete = async (record) => {

      try {
        dispatch({
          type:'SHOW_LOADING'
        })
        //  server + itemRoutes + post k liye
        await axios.post('/api/items/delete-item', {itemId:record._id});
        message.success('Item Deleted Successfully')
        getAllItems();
        setPopUpModal(false)
        // dispatch({
        //   type: 'HIDE_LOADING'
        // })
      } catch (error) {
        dispatch({
          type: 'HIDE_LOADING'
        })
        console.log(error)
        message.error('Something went wrong for Deleteing')
        console.log(error)
      }

    }

    // from ant design
    const columns = [
      {title: 'Name', dataIndex:'name'},
      {title: 'Image', dataIndex:'image', render:(image, record) => <img src={image} alt={record.name} height="60" width="60" /> },
      {title: 'Price', dataIndex:'price'},
      {
        title: 'Actions', 
        dataIndex:'_id', 
        render:(id, record) => 
        <div>
          <EditOutlined 
            style={{cursor: 'pointer'}} 
            onClick={() => {
              setEditItem(record);
              setPopUpModal(true);
            }}
            />
          <DeleteOutlined 
            style={{cursor: 'pointer'}} 
            onClick={() => handleDelete(record)}
            />
        </div>
    },
  ]

  // handle Form submit
  const handleSubmit = async (value) => {
    console.log(value)
    if(editItem === null ){
      try {
        dispatch({
          type:'SHOW_LOADING'
        })
        //  server + itemRoutes + post k liye
        // eslint-disable-next-line
        const res = await axios.post('/api/items/add-item', value);
        message.success('Item Added Successfully')
        getAllItems();
        setPopUpModal(false)
        dispatch({
          type: 'HIDE_LOADING'
        })
      } catch (error) {
        console.log(error)
        message.error('Something went wrong for editing')
        console.log(error)
      }
    } else {
      try {
        dispatch({
          type:'SHOW_LOADING'
        })
        //  server + itemRoutes + post k liye
        await axios.put('/api/items/edit-item', { ...value, itemId:editItem._id });
        message.success('Item Updateed Successfully')
        getAllItems();
        setPopUpModal(false)
        dispatch({
          type: 'HIDE_LOADING'
        })
      } catch (error) {
        console.log(error)
        message.error('Something went wrong')
      }
    }
  };
  
  return (
    <DefaultLayout>
      <div className='d-flex justify-content-between'>
      <h1>ItemPgae</h1>
      <Button type='primary' onClick={() => setPopUpModal(true)}>Add Item</Button>
      </div>
      <Table columns={columns} dataSource={itemsData} bordered />

      {/* from antd popupModal */}
      {
        popUpModal && (
      <Modal 
        title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
        visible={popUpModal} 
        onCancel={() => { 
          setEditItem(null)
          setPopUpModal(false)
        }} 
        footer={false}
        >
          <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="image URL">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
            <Select>
              <Select.Option value="drinks" >Drinks</Select.Option>
              <Select.Option value="Rice" >Rice</Select.Option>
              <Select.Option value="noodles" >Noodles</Select.Option>
            </Select>
            </Form.Item>
            <div className='d-flex justify-content-end'>
              <Button type='primary' htmlType='submit'>SAVE</Button>
            </div>
          </Form>
      </Modal>
        )
      }
    </DefaultLayout>
  )
}

export default ItemPgae