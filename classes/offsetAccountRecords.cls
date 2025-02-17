public with sharing class offsetAccountRecords {
    @AuraEnabled(cacheable=true)
    public static List<Account>  accountRecordsToOffset(Integer numberOfRows, Integer rowsToSkip) {

        Integer rowsToOffset=(rowsToSkip-1)* numberOfRows;

        List<Account> accList = [SELECT Name, Phone,Industry, Rating FROM Account ORDER BY Name ASC LIMIT : numberOfRows OFFSET :rowsToOffset];

        return accList;

    }
}