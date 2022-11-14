import React, {useState, useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import ItemList from '../components/ItemList';

const Homepage = () => {
  const dispatch = useDispatch()
  const [itemsData, setItemsData] = useState([])
  const [seletedCategory, setSelectedCategory] = useState('drinks')

  const categories = [
    {
      name: 'drink',
      imageUrl: 'https://cravecookclick.com/wp-content/uploads/2012/07/IMG_4400.jpg'
    },
    {
      name: 'rice',
      imageUrl: 'https://cravecookclick.com/wp-content/uploads/2012/07/IMG_4400.jpg'
    },
    {
      name: 'noodles',
      imageUrl: 'https://cravecookclick.com/wp-content/uploads/2012/07/IMG_4400.jpg'
    }
  ]
  // useEffect
  useEffect(() => {
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
    getAllItems()
  },[dispatch])
  return (
    <DefaultLayout>
      <div className='d-flex'>
        {categories.map((category) => (
          <div 
            key={category.name} 
            className={`d-flex category ${ 
              seletedCategory === category.name && "category-active"}`}
              onClick={() => setSelectedCategory(category.name)}
              >
            <h4>{category.name }</h4>
            <img src={category.imageUrl} alt={category.name} height="40" width="60" />
          </div>
        ))}
      </div>
      <Row>
        {
          itemsData.filter(i => i.category === seletedCategory).map(item => (
            <Col xs={24} lg={6} md={12} sm={6}>
            <ItemList key={item.id} item={item} />
            </Col>
          ))
        }
      </Row>
    </DefaultLayout>
  )
}

export default Homepage