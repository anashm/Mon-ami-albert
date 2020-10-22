import React ,{ Fragment } from 'react';
import MediumTitle from '../../../../general/MediumTitle/MediumTitle';
import SmallTitle from '../../../../general/SmallTitle/SmallTitle';

import Class from './Class/Class';

const Classes = ({ infos , subInfos }) => {
    return (
        <div className = 'classes-container'>
            <MediumTitle text = { infos.title } />
            <div className="class-names-container">
            { infos.names.map(name =>   <Class key ={name} name = { name } />) }
            </div>

            { subInfos &&
                <div className="subinfos-container">
                    { subInfos.map(subInfo => (
                            <Fragment key= {subInfo.title} >
                                <SmallTitle text = { subInfo.title } />
                                <div className="sub-info-text-container">
                                    { subInfo.texts.map( info =>  <Class key ={info} name = { info } />) }
                                </div>
                            </Fragment>
                        )
                    )}
                </div>
            }
        </div>
    )
}

export default Classes;
