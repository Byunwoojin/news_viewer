import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsList=({category})=>{
    const [loading, response, error] = usePromise(()=>{
        const query = category==='all' ? '':`&category=${category}`;
        return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=b835d80570fc432eb04ebb80f0a068c8`,);
    },[category]);



    if(loading){
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }
    if(!response){
        return null;
    }
    if(error){
        return <NewsListBlock>에러 발생!</NewsListBlock>
    }
    const {articles} = response.data;

    return(
        <NewsListBlock>
            {articles.map(article=>(
            <NewsItem key={article.url} article={article}/>
            ))}
        </NewsListBlock>
    )
}
const NewsListBlock=styled.div`
    box-sizzing: border-box;
    padding-bottom : 3rem;
    width:768px;
    margin: 0 auto;
    margin-top: 2rrem;
    @medai screen and (max-width: 768px){
        width:100%;
        padding-left:1rem;
        padding-right:1rem;
    }
`;

const sampleArticle={
    title:'제목',
    description:'내용',
    url:'https//google.com',
    urlToImage:'https://via.placeholder.com/160',
};

export default NewsList;