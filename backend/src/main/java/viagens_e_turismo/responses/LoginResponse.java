package viagens_e_turismo.responses;

public class LoginResponse {
    private int id;
    private String userType;
    private String name;

    public LoginResponse(int id, String userType, String name) {
        this.id = id;
        this.userType = userType;
        this.name = name;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getUserType() {
        return userType;
    }

    public String getName() {
        return name;
    }
}

