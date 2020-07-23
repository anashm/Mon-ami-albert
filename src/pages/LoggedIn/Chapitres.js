import React, { Component } from 'react'
import ChapitreComponent from './ChapitresComp/ChapitreComponent';

export default class Chapitres extends Component {
    render() {
        return (
            <div className="container" style={{backgroundColor:'#FAFAFA',margin:'50px 50px 50px 60px'}}>
                <h3 style={{padding:'40px 20px 10px 30px'}}>Chapitres</h3>
                
                <div style={{display:'flex'}}>
                    <ChapitreComponent ordre="1" title="Les différentes écritures d'un nombre" />
                    <ChapitreComponent ordre="2" title="Les diviseurs et les multiples" />
                    <ChapitreComponent ordre="3" title="Calcul littéral" />
                </div>

                <div style={{display:'flex'}}>
                    <ChapitreComponent ordre="4" title="Les équations et les inéquations" />
                    <ChapitreComponent ordre="5" title="Organisation et gestion de données" />
                    <ChapitreComponent ordre="6" title="Les probabilités" />
                </div>

                <div style={{display:'flex'}}>
                    <ChapitreComponent ordre="7" title="Notion de fonction" />
                    <ChapitreComponent ordre="8" title="Notion de fonction" />
                    <ChapitreComponent ordre="9" title="Théorème de Thalès et réciproque" />
                </div>
                
            </div>
        )
    }
}
