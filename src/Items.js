import ItemContent from './ItemContent';
import ItemHeader from './ItemHeader';
import ListItems from './ListItems';

const Items = ({items,setItems,addItems,setAddItems}) => {

     
    return (
        <main className="mx-10 border rounded-2xl border-gray-400">

            <ItemHeader/>
            <ListItems items={items} setItems={setItems} />
            <ItemContent items={items} setItems={setItems} addItems={addItems} setAddItems={setAddItems} />
            
        </main>
    )
}

export default Items
