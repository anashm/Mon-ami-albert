import React,{useState} from 'react';
import QrReader from 'react-qr-reader'

const QRComponent = () => {
    const [result , setResult] = useState(null);
    const[idCode,setIdCode] = useState('');
    const[nbrPoints,setNbrPoint] = useState(0);

    const handleScan = data => {
        if (data) {
          setResult(data)
          let resultat = data.split('###');
          setIdCode(resultat[0]);
          setNbrPoint(resultat[1]);
        }
      }
    const handleError = err => {
        console.error(err)
     
      }
    return (
        <div>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
                />
            <p>{idCode}</p>
            <p>{nbrPoints}</p>
        </div>
    )
}

export default QRComponent;
