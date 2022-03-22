
import {useState, useEffect, useRef, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'


import styles from './MyModal.module.scss'


const MyModal = (props) => {

    const ASPECT_RATIO = 16 / 9

    const modalOverlayRef = useRef()

    const [dimensions, setDimensions] = useState({
        height: 100,
        width: 200 //window.innerWidth
    })



    // DEBOUNCE

    let timeoutId = null
    const handleWindowResize = () => {
        if(modalOverlayRef.current) {
            
            //console.log(`client height: ${modalOverlayRef.current.getBoundingClientRect().width} and height: ${modalOverlayRef?.current?.clientWidth}`)
            const width = modalOverlayRef?.current?.clientWidth
            const height = modalOverlayRef?.current?.clientHeight

            const heightRelativeToWidth = modalOverlayRef?.current?.clientWidth / ASPECT_RATIO
            const widthRelativeToHeight = modalOverlayRef?.current?.clientHeight * ASPECT_RATIO

            const fittedWidth  = heightRelativeToWidth > height ? widthRelativeToHeight : width
            const fittedHeight = heightRelativeToWidth > height ? height : heightRelativeToWidth


            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => setDimensions({
                width: fittedWidth, //modalOverlayRef?.current?.clientWidth,
                height: fittedHeight, //modalOverlayRef?.current?.clientHeight
            }), 150)
        }



    }

    useLayoutEffect(() => {
        window.addEventListener('resize', handleWindowResize)
        return () => {window.removeEventListener('resize', handleWindowResize)}
    }, [])







    // ESCAPE KEY
    const closeOnEscapeKeyDown = (e) => {
        if((e.charCode || e.keyCode) === 27) {
            props.onRequestClose()
        }
    }

    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown)
        return () => {document.body.removeEventListener('keydown', closeOnEscapeKeyDown)}
    }, [])











    if(!props.isOpen) {
        return null
    }
    return (

        <div ref={modalOverlayRef} className={`${styles.modalOverlay}`} onClick={props.onRequestClose}>
        <div className={`${styles.modalWrapper}`} onClick={e => e.stopPropagation()} style={{width: dimensions.width, height: dimensions.height}}>  
            <div className={`${styles.modal}`}>  


                <div className={`${styles.modalLeftFrame}`}>
                    {dimensions.width} X {dimensions.height}
                    fasdfawefasdf

                    {props.children}
           
               </div>
               <div className={`${styles.modalRightFrame}`}>
         
                  <br/>
                
                </div>

             </div>
        </div>
        </div>
    )
}

export default MyModal










// useEffect( () => {

//     if(modalWrapperRef.current) {
//         const wrapperDimensions = modalWrapperRef.current.getBoundingClientRect()
//         console.log(wrapperDimensions.width, wrapperDimensions.height)
//     }

// }, [modalWrapperRef])
// // Width

// const [dimensions, setDimensions] = React.useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });




// <div className={`${styles.modalOverlay}`} onClick={props.onRequestClose}>
//     <div className={`${styles.modalWrapper}`} onClick={e => e.stopPropagation()}>  

//     <div className={`${styles.modal}`}>  


//         <div className={`${styles.modalLeftFrame}`}>
//             {props.children}
//             hoserg
//         </div>
//         <div className={`${styles.modalRightFrame}`}>
//             gasdfasdf
//             asdfasdf
//             <br/>
//             gawefsdf
//         </div>

//     </div>

//     </div>
// </div>
