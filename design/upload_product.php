<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $price = $_POST['price'];

    // Image handling
    $targetDir = "uploads/";
    $imageName = basename($_FILES["image"]["name"]);
    $targetFile = $targetDir . $imageName;

    // Move uploaded file
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
        // Save to DB
        $stmt = $conn->prepare("INSERT INTO products (name, price, image) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $price, $targetFile);
        if ($stmt->execute()) {
            echo "<script>alert('Product uploaded successfully!'); window.location.href='admin.html';</script>";
        } else {
            echo "Database error.";
        }
        $stmt->close();
    } else {
        echo "Failed to upload image.";
    }

    $conn->close();
}
?>
