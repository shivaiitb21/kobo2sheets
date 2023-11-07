//############  Code developed by Shivanand Nalgire #############//

function syncKoboToGoogleSheet() {
  var koboApiUrl = 'https://kf.kobotoolbox.org/api/v2/assets/{your_form_id}/data.json';
  var koboApiToken = 'your_api_token_here'; // Replace with your KoboToolbox API token
  var ss = SpreadsheetApp.openById('your_sheet_id_here'); // Replace with your Google Sheet ID
  var sheet = ss.getSheetByName('Sheet1'); // Replace with your sheet name

  var options = {
    headers: {
      Authorization: 'Token ' + koboApiToken
    }
  };

  var response = UrlFetchApp.fetch(koboApiUrl, options);
  var data = JSON.parse(response.getContentText());

  var values = [];
  if (data && data.results) {
    data.results.forEach(function (result) {
      // Adjust keys according to your KoboToolbox form structure i.e. questions in the form
      var row = [
        result._id,
        result.start,
        result.Village,
        result.Sapling_given,
        result.Year_of_plantation
        // Add more fields as needed
      ];
      values.push(row);
    });
  }

  if (values.length > 0) {
    sheet.getRange(2, 1, values.length, values[0].length).setValues(values);
  }
}
