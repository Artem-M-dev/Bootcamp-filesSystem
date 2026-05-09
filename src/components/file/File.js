import './file.scss';
import fileIcon from '../../icons/fileIcon.svg';

const File = (props) => {
    return (
        <div className="file">
            <img src={fileIcon} alt="" className="file__icon" />
            <p className="file__name">{props.name}</p>
        </div>
    )
}

export default File;