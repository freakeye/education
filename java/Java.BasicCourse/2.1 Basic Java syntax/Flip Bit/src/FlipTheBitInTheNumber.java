/**
 * https://stepik.org/lesson/12759/step/15?unit=3107
 */

import java.util.Scanner;
import static java.lang.Math.pow;

public class FlipTheBitInTheNumber {

    /**
     * Flips one bit of the given <code>value</code>.
     *
     * @param value     any number
     * @param bitIndex  index of the bit to flip, 1 <= bitIndex <= 32
     * @return new value with one bit flipped
     */
    public static int flipBit(int value, int bitIndex) {
        int res, bitNumber;
        if (! (1 <= bitIndex && bitIndex <= 32) ) {
            bitIndex %= 32;
        }
        bitNumber = (int) pow(2, bitIndex-1);
        //System.out.println(bitNumber);
        res = value ^ bitNumber;
        return res;
    }


    public static void main(String[] args) {
        int val, ind;
        Scanner scan = new Scanner(System.in);
        val = scan.nextInt();
        ind = scan.nextInt();
        System.out.println(flipBit(val, ind));
    }

}
