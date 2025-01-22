import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';

const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        paddingRight: "40px"
    },
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'flex-start'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'flex-start'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
        textAlign: "left"
    },
    label: {
        width: "auto",
        marginRight: "10px"
    },
    invoiceSubjectContainer: {
        width: "200px",
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'flex-start'
    }
});

const InvoiceNo = ({ invoice }) => (
    <Fragment>
        <View style={styles.flexContainer}>
            <View>
                <View style={styles.invoiceNoContainer}>
                    <Text style={styles.label}>Invoice No:</Text>
                    <Text style={styles.invoiceDate}>{invoice?.invoice_num}</Text>
                </View>
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label}>Invoice Date:</Text>
                    <Text style={styles.invoiceDate}>{moment(invoice?.createdAt?.split("T")[0]).format("DD-MM-YYYY")}</Text>
                </View >
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label}>Payment Method: </Text>
                    <Text >{invoice?.payment_mode}</Text>
                </View>
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label}>Place Of Supply: </Text>
                    <Text >{invoice?.place_supply}</Text>
                </View>
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label}>Doctor: </Text>
                    <Text >{invoice?.doctor_name}</Text>
                </View>
                <View style={styles.invoiceDateContainer}>
                    <Text style={styles.label}>Bill To: </Text>
                    <Text >{invoice?.patient_name}</Text>
                </View>
            </View>
            <View style={styles.invoiceSubjectContainer}>
                <Text style={styles.label}>Subject: </Text>
                <Text >{invoice?.subject}</Text>
            </View>
        </View>
    </Fragment>
);

export default InvoiceNo;