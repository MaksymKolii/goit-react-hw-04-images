import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  h1,
h2,
h3,
p{
    margin-top: 0px;
    margin-bottom: 0px;
}
ul,
ol{
    margin-top: 0px;
    margin-bottom: 0px;
    padding-left: 0px;
    list-style: none;
}
img{
    display: block;
    max-width: 100%;
    height: auto;
}
a{
    text-decoration: none;
}
`;
