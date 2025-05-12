    import React from 'react'
    import ReactDOM from 'react-dom/client'
    import 'bootstrap/dist/css/bootstrap.min.css';
    import ActivityForm from './ActivityForm';

    function App() {
    return (
        <div className="container mt-5">
        <ActivityForm />
        </div>
    );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'))


    root.render(<>
            <App/>
        </>)