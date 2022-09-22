import React from 'react'
import useFetch from '../../Hooks/useFetch'
 
import './Featured.css'
function Featured() {
  const {data,error,loading} = useFetch('/hotels/find/countByCity?cities=hyderabad,mumbai,vizag')
 
  console.log('Data',data,error,loading)
  return (
    <div className='featured'>
      {loading ? "Loading please wait !!" : <><div className='featuredItem'>
          <img className='featuredImage'
          src='https://a.cdn-hotels.com/gdcs/production180/d495/d6bc9f7d-98d9-4c49-a97f-1c101e966878.jpg' alt=''></img>
          <div className='featuredTitles'>
              <h1>Hyderabad</h1>
              <h1>{data[0]} properties</h1>
          </div>
      </div>
      <div className='featuredItem'>
          <img className='featuredImage' src='https://www.riu.com/images/hotels/1401.jpg' alt=''></img>
          <div className='featuredTitles'>
              <h1>Mumbai</h1>
              <h1>{data[1]} Properties</h1>
          </div>
      </div>
      <div className='featuredItem'>
          <img className='featuredImage' src='https://static.toiimg.com/thumb/56622401/Main.jpg?width=1200&height=900' alt=''></img>
          <div className='featuredTitles'>
              <h1>Vizag</h1>
              <h1>{data[2]} Properties</h1>
          </div>
      </div></>}
    </div>
  )
}

export default Featured
