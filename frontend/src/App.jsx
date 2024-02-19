import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import React from 'react'
import Admin from './pages/admin/Admin'
import Error from './pages/Error'
import Profile from './pages/admin/Profile'
import Party from './pages/admin/Party'

const App = () => {
  return (
    <BrowserRouter>
    
    <Routes>

      <Route path='/' element={ <Admin/> } >
        <Route path='dashboard'/>
        <Route path='party'element={<Party/>}/>  
        <Route path='profile' element={<Profile/>}/>
        <Route path='candidates' element={ <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, dicta asperiores! Eveniet corporis, exercitationem dolores vitae possimus veritatis, deserunt excepturi eius rerum cumque nam laudantium minima pariatur, quos ipsum unde.
        Sequi, explicabo. Nam quibusdam, fuga hic provident nemo ratione dicta ipsa perspiciatis eaque perferendis quasi officia omnis est accusantium exercitationem architecto dolore quae error! Quae amet quisquam sint neque laboriosam.
        Accusamus enim pariatur exercitationem cupiditate est sequi harum maxime minus, officia odit, quam eum quo dolorum accusantium consectetur rem quibusdam quaerat ratione quos. Nostrum ipsa sed, dolore molestiae eos quas!
        Accusantium, nobis laudantium velit tempore adipisci nihil earum, enim quis tempora error itaque, vitae officia? Veniam laudantium ullam, consequatur itaque rem cum, porro minus doloremque excepturi eligendi odit ratione illum?
        Reprehenderit neque minus culpa iusto eveniet dolores repellendus eaque, asperiores laudantium nam dicta iste id veniam! Animi, omnis eum autem voluptates a hic sapiente harum beatae reiciendis magnam eveniet veniam.
        Quod cum odio placeat eos fugit impedit maxime veritatis quibusdam, tenetur esse, vel expedita odit laborum debitis, officiis rem reiciendis molestias in nihil illo voluptatibus quos. Eius voluptatibus exercitationem nisi!
        Aperiam, illum at mollitia laborum sint nisi impedit iusto! Recusandae, voluptate quos sunt nostrum aliquid hic voluptates reprehenderit accusamus rerum quis numquam maiores quibusdam expedita veniam mollitia aut laborum! Itaque.
        Dolores iusto repudiandae unde reprehenderit ipsam tenetur, maxime inventore voluptate! Repellat consequatur adipisci qui ab quod debitis, culpa maxime. Delectus sed at quis dicta dolore nihil officiis voluptatem praesentium aut.
        Esse minus id aspernatur alias quae quaerat debitis sapiente aliquid, voluptas, voluptate quam repellat! Quia provident quam similique laboriosam in debitis incidunt officia dolor rerum totam. Minima error dicta rem!
        Possimus quos assumenda, doloremque non nemo explicabo voluptatum exercitationem natus blanditiis quo consequuntur obcaecati enim commodi officia inventore consectetur totam aut eos omnis delectus ab, impedit sit! Atque, ratione nulla?
        Eum, ratione quasi ipsa officia inventore harum aperiam labore fuga vel, deserunt, ullam consequuntur placeat repellendus dolorem beatae ducimus iste alias eius quisquam? Molestias, reiciendis velit repudiandae quibusdam dolorem numquam.
        Quae, ipsam exercitationem. Nulla voluptate voluptatibus, magni earum omnis eaque est. Voluptatem, harum debitis. Ab dignissimos labore provident laborum molestias dicta fugiat illo aperiam iste ut! Nesciunt reprehenderit molestias consequatur?
        Fuga totam corrupti quo repellendus incidunt dolorem cupiditate ipsum autem possimus voluptas. Maxime iure odio in qui dicta vero aperiam, molestias amet eius distinctio natus ea excepturi ipsum? Harum, accusamus.
        Soluta odio aperiam, quaerat magnam quam reiciendis iusto, aliquid obcaecati maiores ipsam quas? Corrupti sequi nemo doloremque debitis fugiat! Architecto deserunt porro fugit atque quis natus, rem temporibus esse magni!
        Dolore natus, illum culpa pariatur architecto quisquam, eaque velit incidunt commodi officia dicta nemo qui eligendi quaerat quia eius consequuntur, reiciendis consectetur. Odio saepe rem optio consectetur modi, quae suscipit.</div> }/>
        <Route path='announcements'/>
        <Route path='results' />
        <Route path='feedback'/>
        <Route path='logout'/>
      </Route> 

      <Route path='/*' element={<Error/>}/> 
    </Routes>
    </BrowserRouter>
  )
}

export default App
