//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

//package edu.freakeye.stepik_JBC;

/*	https://stepik.org/lesson/12762/step/10?unit=3110
 */

import java.util.*;

public class Main {

    static String[] roles0 = new String[] {
            "Городничий",
            "Аммос Федорович",
            "Артемий Филиппович",
            "Лука Лукич"
    };
    static String[] textLines0 = new String[] {
            "Городничий: Я пригласил вас, господа, с тем, чтобы сообщить вам пренеприятное известие: к нам едет ревизор.",
            "Аммос Федорович: Как ревизор?",
            "Артемий Филиппович: Как ревизор?",
            "Городничий: Ревизор из Петербурга, инкогнито. И еще с секретным предписаньем.",
            "Аммос Федорович: Вот те на!",
            "Артемий Филиппович: Вот не было заботы, так подай!",
            "Лука Лукич: Господи боже! еще и с секретным предписаньем!"
    };

    public static void main(String[] args) {
        printTextPerRole(roles0, textLines0);
    }

    private static void printTextPerRole(String[] roles, String[] textLines) {
        Map<String, List<String>> rolesWithTheirReplicas = new HashMap();
        Map<String, Integer> rolesWithReplicaCounter = new HashMap();
        String numberedReplica = "";
//        String[] var5 = roles;
//        int var6 = roles.length;

        //
        for(String i : roles) {
            rolesWithReplicaCounter.put(i, 0);
            rolesWithTheirReplicas.put(i, new ArrayList());
        }

//        var5 = textLines;
//        var6 = textLines.length;

        //for(var7 = 0; var7 < var6; ++var7) {
        for(String i : textLines) {

            //i = var5[var7];
            HashMap<String, String> role_replica = getRoleAndItsReplica(i);
            String currRole = role_replica.keySet().iterator().next();
            int currIndex = rolesWithReplicaCounter.get(currRole);
            int currNumber = currIndex + 1;
            rolesWithReplicaCounter.put(currRole, currNumber);
            numberedReplica = currNumber + ") " + (String)role_replica.get(currRole);
            rolesWithTheirReplicas.get(currRole).add(currIndex, numberedReplica);
        }

        formatedPrintIStr((HashMap)rolesWithTheirReplicas);
    }

    private static void formatedPrintIStr(HashMap<String, List<String>> hM) {
        hM.entrySet().forEach((entry) -> {
            System.out.println((String)entry.getKey() + " " + entry.getValue());
        });
    }

    public static void formatedPrintInt(HashMap<String, Integer> hM) {
        hM.entrySet().forEach((entry) -> {
            System.out.println((String)entry.getKey() + " " + entry.getValue());
        });
    }

    private static HashMap<String, String> getRoleAndItsReplica(String str) {
        int indexOfColon = str.indexOf(":");
        String role = str.substring(0, indexOfColon);
        String replica = str.substring(indexOfColon);
        HashMap<String, String> res = new HashMap();
        res.put(role, replica);
        return res;
    }
}
