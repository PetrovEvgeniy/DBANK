import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank{
  stable var currentValue = 300.0;
  stable var startTime = Time.now();
  Debug.print(debug_show(startTime));

  //Allows users to deposit an amount to the currentValue
  public func topUp(amount: Float) {
    currentValue += amount;
     Debug.print(debug_show(currentValue));
  };

  //Allows users to withdraw an amount from the currentValue

  public func withdraw(amount: Float) {

    let tempValue: Float = currentValue - amount;
    if(tempValue >= 0){
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else{
      Debug.print("Withdrawl amount is too large! ");

    } 
    
  };

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;    // time elapsed in nanoseconds
    let timeElapsedS = timeElapsedNS / 1000000000; //time elapsed in seconds
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;

    Debug.print(debug_show(currentValue));
    
  }





};
