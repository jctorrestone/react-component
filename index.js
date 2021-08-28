function App(){
    const [data, setData] = React.useState(null);        
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        async function getData() {
            const response = await fetch('./books.json');
            const json     = await response.json();
            setData(json);
            setLoaded(true);
        }
        getData();
    },[])
    console.log('loaded:', loaded, 'data:', data);

    function loadPage(){
        const selected = location.hash.replace('#',"");
        console.log(selected);
        if(loaded){
            console.log(data.books[selected]);
            
            ReactDOM.render(
                (<Book data={data.books[selected]} key={selected}/>),
                document.getElementById('books')
            );
        }
    }

    window.addEventListener("hashchange", loadPage);

    return (<>
        <div className="container" id="algo">
            <h1>React Components</h1>
            <div id="books">
                {loaded && data.books.map((book,i) => <div key={i}><a href={"#"+i} key={i}> {book.title} </a></div>)}    
                {/* {loaded && data.books.map((book,i) => <Book data={book} key={i}/>)} */}
            </div>
        </div>        
    </>);   
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
