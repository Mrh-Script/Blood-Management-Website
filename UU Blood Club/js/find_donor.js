const donorForm = document.getElementById('donor-form');
const donorInfoCard = document.getElementById('donor-info-card');
const selectedGroup = document.getElementById('blood')

const getData = async () => {
  const res = await fetch('php/find_donor.php');
  const json = await res.json();
  return json;
}
const showData = async (group) => {
  const data = await getData();
  const searchingData = data.filter(donor => donor.BLOOD_GROUP === group);
  let donorList = "";

  if (!searchingData.length) {
    donorList += `
      <div style="border: 2px solid #e0a0a0; 
        background-color: #fff8f8; 
        border-radius: 10px; padding: 15px; 
        text-align: center; 
        box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
        max-width: 300px; 
        margin: 20px auto;">
        <h3 style="color: #b33; margin-bottom: 10px;">Donor not found</h3>
        <p style="color: #555; font-size: 14px; margin-bottom: 10px;">
          We couldn't find any matching donor record.
        </p>
        <a href="be_donor.html" 
           style="display: inline-block; padding: 6px 12px; 
           background-color: #b33; color: white; 
           text-decoration: none; border-radius: 5px; 
           border: 1px solid #7a0f0f;">
           Be a Donor
        </a>
      </div>

      <div style="border: 2px solid #e0a0a0; 
        background-color: #fff8f8; 
        border-radius: 10px; padding: 15px; 
        text-align: center; 
        box-shadow: 0 4px 10px rgba(0,0,0,0.1); 
        max-width: 300px; 
        margin: 20px auto;">
        <h3 style="color: #b33; margin-bottom: 10px;">Member not found</h3>
        <p style="color: #555; font-size: 14px; margin-bottom: 10px;">
          We couldn't find any matching membership record.
        </p>
        <a href="membership.html" 
           style="display: inline-block; padding: 6px 12px; 
           background-color: #b33; color: white; 
           text-decoration: none; border-radius: 5px; 
           border: 1px solid #7a0f0f;">
           Be a Member
        </a>
      </div>
    `;
    donorInfoCard.innerHTML = donorList;
    return;
  }

  searchingData.forEach(element => {
    donorList += `
      <div class="donor-card" 
           style="border: 2px solid #ccc; padding: 15px; 
           border-radius: 10px; margin: 10px; 
           box-shadow: 0 2px 6px rgba(0,0,0,0.1); 
           background-color: #fafafa;">
        <h3 style="color:#333;"><i title="${element.TYPE === 'Member' ? 'member' : 'donor'}" class="fa-solid ${element.TYPE === 'Member' ? 'fa-users' : 'fa-hand-holding-droplet'}"></i> Name: ${element.FULL_NAME}</h3>
        <p style="color:#555;">Blood Group: ${element.BLOOD_GROUP}</p>
        <p style="color:#555;">Phone: ${element.PHONE_NUMBER}</p>
        <p style="color:#555;">Address: ${element.ADDRESS}</p>
        <p style="color:#555;">Last Donate: ${element.LAST_DONATION_DATE}</p>
      </div>
    `;
  });

  donorInfoCard.innerHTML = donorList; // ✅ Show donor cards
};



donorForm.addEventListener('submit', (e) => {
  e.preventDefault();
  showData(selectedGroup.value);
  donorInfoCard.style.display = 'grid';
});