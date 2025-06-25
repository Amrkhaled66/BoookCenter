import InputFiled2nd from 'src/components/ui/InputFiled2nd'
import ComboboxDropdown from 'src/components/ui/ComboboxDropdown'
import TransparentBtn from 'src/components/ui/TransparentBtn'
import Loader from 'src/components/ui/icons/Loader'

import { useGetAllCategories, useGetAllSellers, useGetAllSubjects, useGetProductOptions } from 'src/hooks/DashBoard/useAdminMutations'

import getItemId from 'src/services/getItemId'
import { COLORS } from 'src/services/defaultSettings'
const filter = ({ setOptions }) => {
    const { data: products, isLoading: loadingProducts, error } = useGetProductOptions()
    const { data: categories, isLoading: loadingCategories, error: categoriesError } = useGetAllCategories()
    const { data: sellers, isLoading: loadingSellers, error: sellersError } = useGetAllSellers()
    const { data: subjects, isLoading: loadingSubjects, error: subjectsError } = useGetAllSubjects()


    const isLoading = loadingProducts || loadingCategories || loadingSellers || loadingSubjects;

    if (isLoading) {
        return (
            <p className="flex text-xl mt-6 font-bold mx-auto justify-center items-center gap-x-2">
                يتم التحميل الان <Loader />
            </p>
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = Object.fromEntries(form.entries());

        const filters = {
            skuCode: data.skuCode,
            product: getItemId(products.products, data.product),
            category: getItemId(categories, data.category),
            seller: getItemId(sellers, data.seller),
            subject: getItemId(subjects, data.subject),
        };

        setOptions(filters);
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            <InputFiled2nd name="skuCode" label="البحث بكود المنتج" />
            <div className='grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <ComboboxDropdown name={"product"} defaultValue="اختر المنتج" options={["كل المنتجات", ...products.products.map((cat) => cat.name)]} />
                <ComboboxDropdown name={"category"} defaultValue="اختر القسم" options={["كل الاقسام", ...categories.map((cat) => cat.name)]} />
                <ComboboxDropdown name={"seller"} defaultValue="اختر البائع" options={["كل البائعين", ...sellers.map((cat) => cat.name)]} />
                <ComboboxDropdown name={"subject"} defaultValue="اختر المادة" options={["كل المواد", ...subjects.map((cat) => cat.name)]} />
            </div>
            <TransparentBtn type="submit" bgColor={COLORS["secondColor"]} className={"mx-auto w-full rounded-lg  font-semibold text-white"}>بحث</TransparentBtn>
        </form>
    )
}

export default filter