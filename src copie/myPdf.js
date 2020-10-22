import React from 'react';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';


const myPdf = () => {
    return (
        <PDFViewer>
             <Document>
                <Page size="A4" >
                <View >
                    <Text>Section #1</Text>
                </View>
                <View >
                    <Text>Section #2</Text>
                </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}

export default myPdf;
