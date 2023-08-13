import NavigationToolbar from "../page-components/navigation-tool-bar"

const navigationToolbar = new NavigationToolbar()

class MailboxHomePage {

    getUserName() {
        return navigationToolbar.elements.userSection().invoke('text')
    }
}

export default MailboxHomePage