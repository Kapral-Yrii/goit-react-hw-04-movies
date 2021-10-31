import Loader from "react-loader-spinner";
import s from './Loader.module.css'

export default function ShowLoader() {
    return (
        <div className={s.loader}>
           <Loader visible="visible" type="Oval" color="#3f51b5" height={50} width={50} /> 
        </div> 
    )
}