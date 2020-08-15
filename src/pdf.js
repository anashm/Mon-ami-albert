import ReactPDF from '@react-pdf/renderer';

import MyPdf from './myPdf';


ReactPDF.render(<MyPdf />, `${__dirname}/example.pdf`);
