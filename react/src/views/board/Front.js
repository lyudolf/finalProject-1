// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import db from './db.json'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import Preview from "./Preview";


// const Front = () => {

//     const validate = Yup.object({

//         content: Yup.string()
//             .required('필수 정보입니다'),
//         title: Yup.string()
//             .required('필수 정보입니다'),
//         selects: Yup.string()
//             .required('필수 정보입니다'),
//         selects1: Yup.string()
//             .required('필수 정보입니다')

//     })

//     const initialValues = {
//         iamge: '',
//         content: "",
//         title: "",
//         selects: "",
//         nickname: "",
//         selects1: ""
//     };

//     const fileRef = useRef(null);
//     // const [image, setImage] = useState('null');


//     // const onPostNoHandler = (event) => {
//     //     setpostNotice(event.currentTarget.value);
//     // };

//     // const onPostTitleHandler = (event) => {
//     //     setpostTitle(event.currentTarget.value);
//     // }



//     return (
//         <div>
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validate}

//                 onSubmit={(values) => {
//                     const formData = new FormData();
//                     const { image, content, title, selects1, selects } = values;
//                     const select = [{ location: selects }, { level: selects1 }];
//                     console.log(content);
//                     console.log(select);
//                     formData.append('content', content);
//                     formData.append("nickname", "닉네임1");
//                     formData.append('title', title)
//                     formData.append('file', image);
//                     formData.append('category', JSON.stringify(select));


//                     // for (var i = 0; i < select.length; i++) {
//                     //     console.log(select[i]);
//                     // }
//                     axios.post("http://localhost:8000/study", formData, {
//                         "headers": {
//                             'Content-Type': 'multipart/form-data',
//                         }
//                     }).then(function (response) {
//                         console.log(response);
//                     }).catch(function (error) {
//                         console.log(error.response);
//                     });

//                 }
//                 }


//             >
//                 {({ setFieldValue, values }) => (


//                     <Form>

//                         <label>글 제목 Title: </label>
//                         <ErrorMessage id="content" name="content" component="span" />
//                         <Field name="content" />


//                         <label>글 COntent: </label>
//                         <ErrorMessage id="title" name="title" component="span" />
//                         <Field name="title" />


//                         <input ref={fileRef} hidden id="image" name="image" type="file" onChange={(event) => {
//                             setFieldValue("image", event.currentTarget.files[0]);
//                         }} className="form-control" />
//                         {/* <Thumb file={values.file} /> */}

//                         {values.image && <Preview image={values.image} />}
//                         <input type="button" onClick={() => {
//                             fileRef.current.click();
//                         }} value="사진" />


//                         <ErrorMessage id="selects" name="selects" component="span" />
//                         <select name='selects' onChange={e => setFieldValue("selects", e.target.value)} >
//                             {db.Location.map(city => (
//                                 <option key={city.id} value={city.location}>
//                                     {city.location}
//                                 </option>
//                             ))}

//                         </select>
//                         <ErrorMessage id="selects1" name="selects1" component="span" />
//                         <select name='selects1' onChange={e => setFieldValue("selects1", e.target.value)} >
//                             {db.Level.map(level => (
//                                 <option key={level.id} value={level.level}>
//                                     {level.level}
//                                 </option>
//                             ))}

//                         </select>
//                         <button type="submit" >업로드</button>

//                     </Form>
//                 )}
//             </Formik>


//         </div >
//     );
// }
// export default Front;