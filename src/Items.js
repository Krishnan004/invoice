import ItemContent from './ItemContent';
import ItemHeader from './ItemHeader';
import ListItems from './ListItems';

const Items = ({items,setItems,addItems,setAddItems}) => {

     
    return (
            <main className="p-6 m-8 border rounded-2xl border-gray-400">
            <div className="m-2 border rounded-2xl border-gray-400">
                        <ItemHeader/>
                        <ListItems items={items} setItems={setItems} />
                        {items.length === 0 &&(
                        <p className="text-center">Empty</p>
                        )}
                        </div>
    <div className="m-2 border rounded-2xl border-gray-400">
                <ItemContent items={items} setItems={setItems} addItems={addItems} setAddItems={setAddItems} />
                </div>
            </main>
    )
}

export default Items
