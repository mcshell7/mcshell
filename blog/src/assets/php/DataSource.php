<?php
use Phppot\DataSource;

if (! empty($_POST["send"])) {
    $name = $_POST["userName"];
    $email = $_POST["userEmail"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    $isDatabase = false;
    if ($isDatabase) {
        require_once __DIR__ . "/lib/DataSource.php";
        $ds = new DataSource();

        $query = "INSERT INTO tbl_contact (user_name, user_email, subject, message) VALUES (?, ?, ?, ?)";
        $paramType = "ssss";
        $paramArray = array(
            $name,
            $email,
            $subject,
            $message
        );
        $ds->insert($query, $paramType, $paramArray);
    }

    $toEmail = "phppot@example.com";
    $mailHeaders = 'From: webmaster@example.com' . "\r\n" . 'Reply-To: ' . $name . '<' . $email . ">\r\n" . 'X-Mailer: PHP/' . phpversion();

    $mailHeaders = "From: " . $name . "<" . $email . ">\r\n";

    // if lines are larger than 70 chars, then should be wrapped
    $message = wordwrap($message, 70, "\r\n");
    // your PHP setup should have configuration to send mail
   $isValidMail = mail($toEmail, $subject, $message, $mailHeaders);
   if ($isValidMail) {
       $displayMessage = "Message sent. Thank you.";
   }
}
require_once __DIR__ . "/bootstrap-contact-form.php";

<?php
/**
 * Copyright (C) Phppot
 *
 * Distributed under 'The MIT License (MIT)'
 * In essense, you can do commercial use, modify, distribute and private use.
 * Though not mandatory, you are requested to attribute Phppot URL in your code or website.
 */
namespace Phppot;

/**
 * Generic datasource class for handling DB operations.
 * Uses MySqli and PreparedStatements.
 *
 * @version 2.6 - recordCount function added
 */
class DataSource
{

    const HOST = 'localhost';

    const USERNAME = 'root';

    const PASSWORD = 'test';

    const DATABASENAME = 'bootstrap_contact_form';

    private $conn;

    /**
     * PHP implicitly takes care of cleanup for default connection types.
     * So no need to worry about closing the connection.
     *
     * Singletons not required in PHP as there is no
     * concept of shared memory.
     * Every object lives only for a request.
     *
     * Keeping things simple and that works!
     */
    function __construct()
    {
        $this->conn = $this->getConnection();
    }

    /**
     * If connection object is needed use this method and get access to it.
     * Otherwise, use the below methods for insert / update / etc.
     *
     * @return \mysqli
     */
    public function getConnection()
    {
        $conn = new \mysqli(self::HOST, self::USERNAME, self::PASSWORD, self::DATABASENAME);

        if (mysqli_connect_errno()) {
            trigger_error("Problem with connecting to database.");
        }

        $conn->set_charset("utf8");
        return $conn;
    }

    /**
     * To get database results
     *
     * @param string $query
     * @param string $paramType
     * @param array $paramArray
     * @return array
     */
    public function select($query, $paramType = "", $paramArray = array())
    {
        $stmt = $this->conn->prepare($query);

        if (! empty($paramType) && ! empty($paramArray)) {

            $this->bindQueryParams($stmt, $paramType, $paramArray);
        }
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $resultset[] = $row;
            }
        }

        if (! empty($resultset)) {
            return $resultset;
        }
    }

    /**
     * To insert
     *
     * @param string $query
     * @param string $paramType
     * @param array $paramArray
     * @return int
     */
    public function insert($query, $paramType, $paramArray)
    {
        $stmt = $this->conn->prepare($query);
        $this->bindQueryParams($stmt, $paramType, $paramArray);

        $stmt->execute();
        $insertId = $stmt->insert_id;
        return $insertId;
    }

    /**
     * To execute query
     *
     * @param string $query
     * @param string $paramType
     * @param array $paramArray
     */
    public function execute($query, $paramType = "", $paramArray = array())
    {
        $stmt = $this->conn->prepare($query);

        if (! empty($paramType) && ! empty($paramArray)) {
            $this->bindQueryParams($stmt, $paramType, $paramArray);
        }
        $stmt->execute();
    }

    /**
     * 1.
     * Prepares parameter binding
     * 2. Bind prameters to the sql statement
     *
     * @param string $stmt
     * @param string $paramType
     * @param array $paramArray
     */
    public function bindQueryParams($stmt, $paramType, $paramArray = array())
    {
        $paramValueReference[] = & $paramType;
        for ($i = 0; $i < count($paramArray); $i ++) {
            $paramValueReference[] = & $paramArray[$i];
        }
        call_user_func_array(array(
            $stmt,
            'bind_param'
        ), $paramValueReference);
    }

    /**
     * To get database results
     *
     * @param string $query
     * @param string $paramType
     * @param array $paramArray
     * @return array
     */
    public function getRecordCount($query, $paramType = "", $paramArray = array())
    {
        $stmt = $this->conn->prepare($query);
        if (! empty($paramType) && ! empty($paramArray)) {

            $this->bindQueryParams($stmt, $paramType, $paramArray);
        }
        $stmt->execute();
        $stmt->store_result();
        $recordCount = $stmt->num_rows;

        return $recordCount;
    }
}
