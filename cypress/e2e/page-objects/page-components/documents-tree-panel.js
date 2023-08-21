class DocumentsTreePanel {

    elements = {
        trashFolder: () => cy.get('div#doc_tree_trash'),
        myDocumentsFolder: () => cy.contains('div.treeItemLabel', 'My documents'),
        myDocumentsArrowIcon: () => cy.get('.nodeSel > .icon-Arrow-right.treeJoint')
    }
}

export default DocumentsTreePanel