import "./footer.css"


function foot(){

    const dat = new Date().getFullYear()

    return <footer>
            <p>
                Copyright © {dat}
            </p>
            
        </footer>
}

export default foot