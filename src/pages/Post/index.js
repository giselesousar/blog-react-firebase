import React from 'react';
import {Container, Image} from 'react-bootstrap';
import img from '../assets/image.svg'
import Navbar from '../components/Navbar'
import FooterComponent from '../components/Footer';
import './styles.css'
export default function Post(props){

    return(
        <>
        <Navbar />
        <Container className="content-center" >
            <h1>{/**props.location.state.title*/} Substantivo</h1>
            <strong>{/**props.location.state.date*/} May 25, 2020. 14:30 PM</strong>
            <hr/>
            <Container className="justify-content-center image" style={{textAlign:"center"}}>
                <Image src={img} className="image" style={{}} fluid />
            </Container>
            <Container className="paragrafo-container" style={{marginTop: "3em"}}>
                <p>{/**props.location.state.content*/} Substantivo é uma classe de palavras que nomeia seres, objetos, fenômenos, lugares, qualidades, ações, dentre outros.</p>

                <p>Eles podem ser flexionados em gênero (masculino e feminino), número (singular e plural) e grau (aumentativo e diminutivo).</p>

                <p>Tipos de Substantivos
Os substantivos são classificados em nove tipos: comum, próprio, simples, composto, concreto, abstrato, primitivo, derivado e coletivo.</p>

<p>1. Substantivo Comum
Os substantivos comuns são as palavras que designam os seres da mesma espécie de forma genérica:</p>

<p>Exemplos: pessoa, gente, país.</p>

<p>2. Substantivo Próprio
Os substantivos próprios, grafados em letra maiúscula, são palavras que particularizam seres, entidades, países, cidades, estados da mesma espécie.</p>

<p>Exemplos: Brasil, São Paulo, Maria.</p>
<p>3. Substantivo Simples
Os substantivos simples são formados por apenas uma palavra.</p>

<p>Exemplos: casa, carro, camiseta.</p>
<p>4. Substantivo Composto
Os substantivos compostos são formados por mais de uma palavra.

Exemplos: guarda-chuva, guarda-roupa, beija-flor.</p>

<p>5. Substantivo Concreto
Os substantivos concretos designa as palavras reais, concretas, sejam elas pessoas, objetos, animais ou lugares.

Exemplos: menina, homem, cachorro.</p>

<p>6. Substantivo Abstrato
Os substantivos abstratos são aqueles relacionados aos sentimentos, estados, qualidades e ações.

Exemplos: beleza, alegria, bondade.</p>

<p>7. Substantivo Primitivo
Os substantivos primitivos, como o próprio nome indica, são aqueles que não derivam de outras palavras.

Exemplos: casa, folha, chuva.</p>

<p>8. Substantivo Derivado
Os substantivos derivados são aquelas palavras que derivam de outras.

Exemplos: casarão (derivado de casa), folhagem (derivado de folha), chuvarada (derivado de chuva).</p>

<p>9. Substantivo Coletivo
Os substantivos coletivos são aqueles que se referem a um conjunto de seres.</p>
            </Container>
        </Container>
        <FooterComponent />
        </>
    )
}