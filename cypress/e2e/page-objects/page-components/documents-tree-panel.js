class DocumentsTreePanel {

    elements = {
        trashFolder: () => cy.get('div#doc_tree_trash'),
        myDocumentsFolder: () => cy.get('.treeItemRoot > div.treeItemLabel:eq(0)'),
        myDocumentsArrowIcon: () => cy.get('.nodeSel > .icon-Arrow-right.treeJoint')
    }
}

export default DocumentsTreePanel