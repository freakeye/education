import java.util.*;

public class GrigorianCalendar {

    public static void main(String[] args) {
        int inputYear,
            leapYearsCount;

        // This reads the input provided by user using keyboard
        Scanner scan = new Scanner(System.in);
        System.out.print("Enter any number: ");
        // This method reads the number provided using keyboard
        inputYear = scan.nextInt();
        // Closing Scanner after the use
        scan.close();

        leapYearsCount = leapYearsCounter(inputYear);
        System.out.println(leapYearsCount);
    }

    private static int leapYearsCounter(int y) {
        return (y / 400) - (y / 100) + (y / 4);
    }
}
