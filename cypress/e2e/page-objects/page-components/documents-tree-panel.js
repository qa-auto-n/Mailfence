class DocumentsTreePanel {

    elements = {
        trashFolder: () => cy.get('div#doc_tree_trash'),
        myDocuments: () => cy.get('.treeItemRoot > div.treeItemLabel:eq(0)')
    }
}

export default DocumentsTreePanel