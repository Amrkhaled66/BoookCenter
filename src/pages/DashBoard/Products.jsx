import Filter from 'src/components/DashBoard/Products/Filter'
import ProductsTable from 'src/components/DashBoard/Products/ProductsTable'
import AdminContainer from 'src/components/ui/AdminContainer'

import { BsBoxes } from 'react-icons/bs'
import { useState } from 'react'
const Products = () => {
    const [options, setOptions] = useState({
        skuCode: "",
        product: "",
        category: "",
        seller: "",
        subject: "",
    });


    return (
        <AdminContainer title="جدول المنتجات" Icon={<BsBoxes />}>
            <div className='w-full space-y-6 px-8'>
                <Filter setOptions={setOptions} />
                <ProductsTable />
            </div>
        </AdminContainer>
    )
}

export default Products