import React, { useState } from "react";
import Loading from "./Loading";

const App = () => {
    const [url, setURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [websiteContent, setWebsiteContent] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setURL("");
        //👇🏻 Calls the function.
        sendURL();
    };
    //👇🏻 remove the quotation marks around the description
    // const trimDescription = (content) =>
    //     content.match(/(?:"[^"]*"|^[^"]*$)/)[0].replace(/"/g, "");

    async function sendURL() {
        try {
            const request = await fetch("http://localhost:4000/api/url", {
                method: "POST",
                body: JSON.stringify({
                    url,
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            });

            console.log("**request**", request);

            if (!request.ok) {
                throw new Error(`HTTP error! status: ${request.status}`);
            }

            const data = await request.json();
            console.log("🚀 ~ sendURL ~ data:", data);
            //👇🏻 toggles the loading state if the request is successful
            if (data.message) {
                setLoading(false);
                //👇🏻 update the state with the server response
                setWebsiteContent(data.database);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="home">
            <form className="home__form" onSubmit={handleSubmit}>
                <h2>Website Aggregator</h2>
                <label htmlFor="url">Provide the website URL</label>
                <input
                    type="url"
                    name="url"
                    id="url"
                    value={url}
                    onChange={(e) => setURL(e.target.value)}
                />
                <button type="submit">ADD WEBSITE</button>
            </form>
            <main className="website__container ">
                {websiteContent.map((item) => (
                    <div className="website__item" key={item.id}>
                        <img src={item?.brandImage} alt={item?.brandName} />
                        <h3>{item?.brandName}</h3>
                        {/* <p>{trimDescription(item?.brandDescription)}</p> */}
                        <p>{item?.brandDescription}</p>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default App;
