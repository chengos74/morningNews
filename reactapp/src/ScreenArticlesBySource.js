import React, { useState, useEffect } from "react";
import "./App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenArticlesBySource(props) {
    const [articleList, setArticleList] = useState([]);
    const { id } = useParams();
    // https://www.geeksforgeeks.org/reactjs-useparams-hook/
    // The useParams hook returns an object of key/value pairs, of the dynamic params from the current URL that were matched by the <Route path>. Child routes inherit all params from their parent routes.

    //// Load article details ////
    useEffect(() => {
        async function loadArticleDetails() {
            const request = await fetch(
                "https://newsapi.org/v2/top-headlines?sources=" +
                    id +
                    "&apiKey=f5ac6b785031436a835bce1f09dbc88e"
            );
            const articleDetails = await request.json();

            setArticleList(articleDetails.articles);
            console.log(articleDetails);
        }
        loadArticleDetails();
    }, [id]);

    //// Save articles in MongoDB & store ////
    var saveArticles = async (article) => {
        props.addToWishList(article); // Le dispatch pour le store

        await fetch("/wishList", {
            // Pour ajouter dans BDD
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `tokenFromFront=${props.myToken}&titleFromFront=${article.title}&descriptionFromFront=${article.description}&contentFromFront=${article.content}&imageFromFront=${article.urlToImage}`,
        });
    };

    //// Modal options from doc + 2 parameters ////
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    const showModal = (title, content, image) => {
        setIsModalVisible(true);
        setTitle(title);
        setContent(content);
        setImage(image);
    };
    var handleOk = (e) => {
        console.log(e);
        setIsModalVisible(false);
    };
    var handleCancel = (e) => {
        console.log(e);
        setIsModalVisible(false);
    };

    return (
        <div>
            <Nav />
            <div className="Banner" />
            <div className="Card">
                {articleList.map((article, i) => (
                    // {console.log(article)}

                    <div
                        key={i}
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Card
                            style={{
                                width: 300,
                                margin: "15px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                            cover={
                                <img alt="example" src={article.urlToImage} />
                            }
                            actions={[
                                <Icon
                                    type="read"
                                    key="ellipsis2"
                                    onClick={() =>
                                        showModal(
                                            article.title,
                                            article.content,
                                            article.urlToImage
                                        )
                                    }
                                />,

                                <Icon
                                    type="like"
                                    key="ellipsis"
                                    onClick={() => {
                                        saveArticles(article);
                                    }}
                                />,
                            ]}
                        >
                            <Meta
                                title={article.title}
                                description={article.description}
                            />
                        </Card>

                        <Modal
                            title={title}
                            key={i}
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            width={"55rem"}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                alt="articleList"
                                src={image}
                                width="100%"
                                style={{
                                    borderRadius: "25px",
                                    marginBottom: "15px",
                                }}
                            />
                            <p>{content}</p>
                        </Modal>
                    </div>
                ))}
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return { myToken: state.token };
}

function mapDispatchToProps(dispatch) {
    return {
        addToWishList: function (article) {
            dispatch({ type: "addArticle", articleLiked: article });
        },
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScreenArticlesBySource);

// export default ScreenArticlesBySource;
