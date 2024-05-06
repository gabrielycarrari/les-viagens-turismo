package viagens_e_turismo.responses;

public class LoginResponse {
    private String userType;
    private String name;

    public LoginResponse(String userType, String name) {
        this.userType = userType;
        this.name = name;
    }

    // Getters
    public String getUserType() {
        return userType;
    }

    public String getName() {
        return name;
    }
}

