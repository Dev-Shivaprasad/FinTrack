import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { AuthHeaders, BaseURL, Transaction, Users } from "../utils/DBLinks";
import {
  GetUserDetails,
  TransactionDbSchema,
  UserDbSchema,
} from "../utils/DbSchema";
import normaldatetime from "../utils/Normaldatetime";
import Button from "../Button";

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  logoContainer: {
    height: 60,
    marginBottom: 30,
  },
  logo: {
    height: 50,
    objectFit: "contain",
    maxWidth: 150,
  },
  infoSection: {
    flexDirection: "row",
    marginBottom: 20,
  },
  infoLabels: {
    width: "30%",
  },
  infoValues: {
    width: "70%",
  },
  infoText: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    minHeight: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    minHeight: 28,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
  },
  tableHeader: {
    padding: 8,
    fontSize: 11,
    fontWeight: "bold",
    borderRightWidth: 1,
    borderRightColor: "#DDDDDD",
    textAlign: "left",
  },
  tableCell: {
    padding: 8,
    fontSize: 9,
    borderRightWidth: 1,
    borderRightColor: "#DDDDDD",
  },
  dateCell: { width: "15%" },
  detailsCell: { width: "15%" },
  refNoCell: { width: "30%" }, // Increased width for reference numbers
  amountCell: { width: "13%" },
  actionsCell: { width: "12%" },
  financeTypeCell: { width: "15%" },
});

// Define PDF document props interface
interface TransactionPDFProps {
  userInfo: UserDbSchema;
  transactions: TransactionDbSchema[];
}

// Create Transaction PDF Document component
const TransactionPDF: React.FC<TransactionPDFProps> = ({
  userInfo,
  transactions,
}) => (
  <Document
    title={`${userInfo.name} Transactions`}
    author="Fintrack"
    creator="Shivaprasad and Team"
    producer="react-pdf"
    language="en"
  >
    <Page size="A4" style={styles.page}>
      {/* Logo - Ensure the path is correctly resolved by your build tool */}
      <View style={styles.logoContainer}>
        <Image src="./logo/Light.png" style={styles.logo} />
      </View>

      {/* User Information */}
      <View style={styles.infoSection}>
        <View style={styles.infoLabels}>
          <Text style={styles.infoText}>Account Name :</Text>
          <Text style={styles.infoText}>Account Number :</Text>
          <Text style={styles.infoText}>Account Email :</Text>
          <Text style={styles.infoText}>Account Created on :</Text>
        </View>
        <View style={styles.infoValues}>
          <Text style={styles.infoText}>{userInfo.name}</Text>
          <Text style={styles.infoText}>{userInfo.userId}</Text>
          <Text style={styles.infoText}>{userInfo.email}</Text>
          <Text style={styles.infoText}>
            {normaldatetime(userInfo.createdAt.toString())}
          </Text>
        </View>
      </View>

      {/* Transaction Table */}
      <View style={styles.table} wrap>
        {/* Table Header */}
        <View style={styles.tableHeaderRow} fixed>
          <View style={[styles.tableHeader, styles.dateCell]}>
            <Text>Date</Text>
          </View>
          <View style={[styles.tableHeader, styles.detailsCell]}>
            <Text>Details</Text>
          </View>
          <View style={[styles.tableHeader, styles.refNoCell]}>
            <Text>Ref No.</Text>
          </View>
          <View style={[styles.tableHeader, styles.amountCell]}>
            <Text>Amount</Text>
          </View>
          <View style={[styles.tableHeader, styles.actionsCell]}>
            <Text>Actions</Text>
          </View>
          <View style={[styles.tableHeader, styles.financeTypeCell]}>
            <Text>Finance Type</Text>
          </View>
        </View>

        {/* Table Rows */}
        {transactions.map((transaction, index) => (
          <View key={index} style={styles.tableRow} wrap={false}>
            <View style={[styles.tableCell, styles.dateCell]}>
              <Text>{normaldatetime(transaction.date?.toString() ?? "")}</Text>
            </View>
            <View style={[styles.tableCell, styles.detailsCell]}>
              <Text>{transaction.sourceCategory}</Text>
            </View>
            <View style={[styles.tableCell, styles.refNoCell]}>
              <Text>{transaction.transactionId}</Text>
            </View>
            <View style={[styles.tableCell, styles.amountCell]}>
              <Text>
                {transaction.amount.toLocaleString()}
                {"/-"}
              </Text>
            </View>
            <View style={[styles.tableCell, styles.actionsCell]}>
              <Text>{transaction.transactionType}</Text>
            </View>
            <View style={[styles.tableCell, styles.financeTypeCell]}>
              <Text>{transaction.financeType}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

// Main component
const DownloadTransactionTemplate: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserDbSchema>({
    createdAt: "",
    email: "",
    name: "",
    passwordHash: "",
    userId: "",
  });
  const [userTransactionData, setUserTransactionData] = useState<
    TransactionDbSchema[]
  >([]);

  useEffect(() => {
    // Fetch user data
    axios
      .get<UserDbSchema>(
        BaseURL + Users.GetById + GetUserDetails().user_id,
        AuthHeaders
      )
      .then((userdata) => {
        setUserInfo(userdata.data);
      })
      .catch((err) => console.error("Error fetching user data:", err)); // Improved error logging

    // Fetch transaction data
    axios
      .get<TransactionDbSchema[]>(
        BaseURL + Transaction.GetByUserId + GetUserDetails().user_id,
        AuthHeaders
      )
      .then((dta) => {
        setUserTransactionData(dta.data);
      })
      .catch((err) => console.error("Error fetching transaction data:", err)); // Improved error logging
  }, []);

  // Handle download completion
  const handleDownloadClick = () => {
    setIsGenerating(true);
    // Reset the state after a delay
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <div>
      {/* Only render PDFDownloadLink when data is loaded */}
      {userInfo.userId && userTransactionData.length > 0 ? (
        <PDFDownloadLink
          document={
            <TransactionPDF
              userInfo={userInfo}
              transactions={userTransactionData}
            />
          }
          fileName={`${userInfo.name}-transactions.pdf`}
        >
          {({ loading }) => (
            <Button
              title={
                loading || isGenerating ? "Generating PDF..." : "Download PDF"
              }
              action={handleDownloadClick}
            />
          )}
        </PDFDownloadLink>
      ) : (
        <Button title="Loading data..." action={() => {}} />
      )}
    </div>
  );
};

export default DownloadTransactionTemplate;
