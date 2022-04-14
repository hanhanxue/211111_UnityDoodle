

// 04 My Styles
import styles from './MyMDXComponents.module.scss'







const P = (props) => (
    <p {...props} className={`body_1 ${styles.P}`} />
)


const Ul = (props) =>  (

        <ul {...props} className={`${styles.ul}`} />

)

const Li = (props) =>  (
    <li {...props} className={`body_1 ${styles.li}`} />
)

const H2 = (props) =>  (

        <h2 {...props} className={`subtitle_1 ${styles.myHeading} ${styles.H2}`} />

)

// const InlineCode = (props) => (
//     <code {...props} className={`body_1 ${styles.inlineCode}`} />
// )


// const Code = ({children, className}) => {


//     return (
// <>
// gwasdf
// </>
//     )
// }

// const Pre = props => <pre style={{ color: 'red' }} {...props} />
// const Code = props => <code style={{ fontWeight: 600 }} {...props} />



// const InlineCode = (props) => (
//     <code {...props} className={`code ${styles.inlineCode}`} />
// )

const Code = (props) => (
    <code {...props} className={`code ${styles.inlineCode}`} />
)

const ShareMDXComponents = {
    p: P,
    h2: H2,
    ul: Ul,
    li: Li,
    //inlineCode: InlineCode,
    // pre: Pre,
    code: Code,
}

export default ShareMDXComponents

