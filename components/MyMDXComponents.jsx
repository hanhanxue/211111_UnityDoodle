
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



const ShareMDXComponents = {
    // SectionTitle: SectionTitle,
    // SingleImage: SingleImage,
    // Video: Video,
    p: P,
    h2: H2,
    // h3: H3,
    ul: Ul,
    li: Li,
    // code: Code,
    // inlineCode: InlineCode,
    // a: Link,
}

export default ShareMDXComponents

