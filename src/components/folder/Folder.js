import './folder.scss';

import { Link } from 'react-router-dom';

import folderIcon from '../../icons/folderIcon.svg';
import { useState } from 'react';

const Folder = ({name, children, path}) => {
    return (
        <Link to={path} className="folder">
            <div className="folder__main">
                <div className="folder__arrow"></div>
                <div className="folder__wrapper">
                    <img src={folderIcon} alt="" className="folder__icon" />
                    <p className="folder__name">{name}</p>
                </div>
            </div>
            <div className="folder__children">
                {children}
            </div>
        </Link>
    )
}

export default Folder;