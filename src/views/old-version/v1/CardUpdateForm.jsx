import { useState, useEffect } from "react";
import { APIURL } from "../../../App";

function CardUpdateForm({ id, oldTitle, oldContent, onUpdate }) {
    const [form, setForm] = useState({
        backgroundImage: '',
        firstImage: '',
        secondImage: '',
        music: ''
    })
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const appendFormDataImage = (formData, fieldName,image, imageName) => {
        if(image, imageName) return formData.append(fieldName, image, imageName);
    }

    const updateCard = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title)
        formData.append('content', content)

        appendFormDataImage(formData, 'background-image', form.backgroundImage, form.backgroundImage.name)
        appendFormDataImage(formData, 'first-image', form.firstImage,  form.firstImage.name)
        appendFormDataImage(formData, 'second-image', form.secondImage,  form.secondImage.name)
        appendFormDataImage(formData, 'music', form.music, form.music.name)
    
        const response = await fetch(`${APIURL}/manage-cards/${id}`, {
            method: 'PUT',
            body: formData
        })
        const finalResponse = await response.json();

        onUpdate();
    } 

    useEffect(() => {
        setContent(oldContent);
        setTitle(oldTitle);
        console.log(title, content)
    },[oldTitle, oldContent])

    return ( 
        <div>
            <h1>Update {oldTitle}</h1>
            <form onSubmit={updateCard} method="POST" className="form">
                <Input name="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                <textarea 
                    name="content" 
                    className="form-control"
                    style={{resize:'none'}} 
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    placeholder="Content"
                ></textarea>

                <label htmlFor="">Background image</label>
                <Input type="file" name="background-image" onChange={(e) => setForm({...form, backgroundImage: e.target.files[0]})}/>

                <label htmlFor="">First image</label>
                <Input type="file" placeholder="image-1" onChange={(e) =>{ 
                    setForm({...form, firstImage: e.target.files[0]})
                }}/>

                <label htmlFor="">Second image</label>
                <Input type="file" placeholder="image-2" onChange={(e) => setForm({...form, secondImage: e.target.files[0]})}/>

                <label htmlFor="">Music</label>
                <Input type="file" placeholder="music" onChange={(e) => setForm({...form, music: e.target.files[0]})}/>

                <button type="submit" className="btn btn-secondary mt-1" style={{width: '100%'}}>UPDATE</button>
            </form>
        </div>  
    );
}
export const Input = ({ type='text', name='', onChange, value, required }) => <input placeholder={name} type={type} className="form-control" name={name} value={value? value : undefined} onChange={onChange}/>

export default CardUpdateForm;