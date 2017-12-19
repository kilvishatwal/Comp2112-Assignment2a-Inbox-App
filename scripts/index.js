var app = new Vue({
    el: "#app",

    // check if local storage exist if not add emails from MOCK DATA

    mounted: function () {

        if(localStorage.getItem('emails') == null)
        {
        localStorage.setItem('emails', JSON.stringify(emails));
        }

        this.emails = JSON.parse(localStorage.getItem('emails'));
    },
    

    // watch for any changes to email data and update local storage accordingly

    watch: {
        selectedEmail: function () {
            
            localStorage.setItem('emails', JSON.stringify(this.emails));

            
        }
    },
    

    data: {
        emails: [],
        selectedEmail: "",
        view: "inbox" ,// options are inbox, trash, etc.
        button : {
           text: "Delete"   // text for delete button which will update according to view inbox or trash
        }
    },

    methods: {
        // return avatar so that img src attribute knows where to get pic
        getPic: function (emailObj) {
            return emailObj.avatar;
        },

        // return alt text for image for avatar
        getAlt(emailObj) {
            return `${emailObj.first_name} ${emailObj.last_name}'s avatar`;
        },

        // when user clicks an email make email display on main part of page and add css
        clickedEmail: function (emailObj) {
            this.selectedEmail = emailObj;
        },

        // is used to determine whether the css class for selected should be shown
        // Is what I clicked on the same object as currently selectedEmail?
        // If true, then value will be used in v-bind:class="{ 'email-item-selected': isSelected(email) }
        isSelected: function (emailObj) {
            // returns boolean value
            return emailObj == this.selectedEmail;
        },

        // if user clicks compose button, fetch new email and insert into inbox
        incomingEmail() {

            let randomnumber = Math.floor(Math.random() * 99) + 1 ;

            this.emails.unshift(more_emails[randomnumber]);
               
        },

        // used with v-for=email in currentView()
        // IF user clicks Inbox, then show emails that don't have deleted:true
        // If user clicks Trash, then show emails that do have deleted:true
        currentView() {
            switch (this.view) {
                case "inbox":
                    this.button.text = "Delete"
                    return this.emails.filter(email => !email.deleted);
                    break;
                case "trash":
                    this.button.text = "Deleted"
                    return this.emails.filter(email => email.deleted);
                    break;
            }
        },

        // if user clicks Inbox, or Trash, then store it so that currentView()
        // will know which filter to use so to return the appropriate array of emails
        setView(clickedView) {

            this.view = clickedView;
            
            this.selectedEmail = "";
        },

        // if user clicks delete, then store it in the email object, but have to use $set
        // so Vue 'sees' it and reacts to it if any changes happen
        deleteEmail() {

            
            switch (this.view) {

                // move item to trash
                case "inbox":
                    this.$set(this.selectedEmail, "deleted", true);
                    this.selectedEmail = "";
                    break;
                    // move item back from trash to inbox
                case "trash":
                    this.$set(this.selectedEmail, "deleted", false);
                    this.selectedEmail = "";
                    break;
            }
        }
    }
});