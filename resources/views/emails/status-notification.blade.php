<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Status Card Update</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }

    .email-container {
      background-color: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      border-bottom: 2px solid #007bff;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }

    .header h1 {
      color: #007bff;
      margin: 0;
    }

    .greeting {
      font-size: 18px;
      margin-bottom: 20px;
    }

    .card-details {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }

    .card-details h3 {
      color: #000000ff;
      margin-top: 0;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 5px 0;
      border-bottom: 1px solid #dee2e6;
    }

    .detail-label {
      font-weight: bold;
      color: #6c757d;
    }

    .status-badge {
      display: inline-block;
      padding: 5px 5px;
      color: black;
      font-weight: bold;
      text-transform: uppercase;
    }

    .images-grid {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 15px;
    }

    .card-image {
      width: auto;
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      border: 2px solid #dee2e6;
      align-self: center;
    }

    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #dee2e6;
      color: #6c757d;
      font-size: 14px;
    }
  </style>
</head>

<body>
  <div class="email-container">
    <div class="header">
      <h1>PSA Card Submission</h1>
      <p>Status Update Notification</p>
    </div>

    <div class="greeting">
      Hello <strong>{{ $userName }}</strong>,
    </div>

    <p>Your card status has been updated. Here are the details:</p>

    <div class="card-details">
      <h3>Card Information</h3>

      <div class="detail-row">
        <span class="detail-label">Card Name:</span>
        <span>{{ $cardName }}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">Year:</span>
        <span>{{ $cardYear }}</span>
      </div>

      <div class="detail-row">
        <span class="detail-label">Brand:</span>
        <span>{{ $cardBrand }}</span>
      </div>

      @if($cardSerialNumber)
      <div class="detail-row">
        <span class="detail-label">Serial Number:</span>
        <span>{{ $cardSerialNumber }}</span>
      </div>
      @endif

      <div class="detail-row">
        <span class="detail-label">New Status:</span>
        <span class="status-badge">
          {{ $newStatus }}
        </span>
      </div>

      @if($newStatus === 'done' && $cardGrade)
      <div class="detail-row">
        <span class="detail-label">Grade:</span>
        <span style="font-weight: bold;">{{ $cardGrade }}</span>
      </div>
      @endif

      <div class="detail-row">
        <span class="detail-label">Updated At:</span>
        <span>{{ $statusDate }}</span>
      </div>
    </div>

    @if($cardImages->count() > 0)
    <div class="images-section">
      <div class="images-grid">
        @foreach($cardImages as $image)
        <img src="{{ asset('storage/' . $image->path) }}"
          alt="Card Image"
          class="card-image">
        @endforeach
      </div>
    </div>
    @endif

    <div class="footer">
      <p>Thank you for using PSA Card Submission Service</p>
      <p><small>This is an automated notification. Please do not reply to this email.</small></p>
    </div>
  </div>
</body>

</html>