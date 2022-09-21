import React, { useEffect } from "react";
import "./App.css";
import { Card, Icon } from "antd";
import Nav from "./Nav";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenMyArticles(props) {
    // console.log(props)

    //// Load articles from MongoDB ////
    useEffect(() => {
        async function loadArticles() {
            const request = await fetch(`/wishList/${props.myToken}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                // body : ...pas de 'body' avec GET method, on utilise params dans index.js à la place.
            });

            const body = await request.json();

            if (body.result && body.loadArticles) {
                props.importArticles(body.loadArticles);
            }
        }
        loadArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //// Delete from store & BDD ////
    var deleteArticles = async function (article) {
        props.deleteFromWishList(article.title);

        await fetch("/wishList", {
            method: "DELETE",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `tokenFromFront=${props.myToken}&titleFromFront=${article.title}`,
            // Changer à `article.title` pour que la key correspondent au JSON de newsAPI.
        });
    };

    //// No articles ////
    var noArticles;
    if (props.myArticles.length === 0) {
        noArticles = (
            <div style={{ marginTop: "30px" }}>There is no articles</div>
        );
    }

    return (
        <div>
            <Nav />
            <div className="Banner" />

            <div className="Card">
                {noArticles}

                {props.myArticles.map((article, i) => (
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
                                <Icon type="read" key="ellipsis2" />,
                                <Icon
                                    type="delete"
                                    key="ellipsis"
                                    onClick={() => deleteArticles(article)}
                                />,
                            ]}
                        >
                            <Meta
                                title={article.title}
                                description={article.description}
                            />
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return { myArticles: state.wishList, myToken: state.token };
}

function mapDispatchToProps(dispatch) {
    return {
        importArticles: function (articles) {
            dispatch({ type: "importArticles", articles });
        },
        deleteFromWishList: function (articleTitle) {
            dispatch({ type: "deleteArticle", title: articleTitle });
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);

// export default ScreenMyArticles;
